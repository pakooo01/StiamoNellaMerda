const Product = require('../models/productModel')
const User = require('../models/userModel')
const Asta = require('../models/astaModel')
module.exports.getAllAste = async (req,res)=>{ 
    try {
        const aste = await Asta.find();
        res.json(aste);
    } catch (error) {
        res.status(500).json({ message: error.message });
  }
}

module.exports.aggiornaPrezzo = async (req, res) => {
  console.log('chiamato');
  const { astaId, userId, puntata} = req.params;
  try {
    // Effettua la logica di aggiornamento del prezzo qui
    const asta = await Asta.findById(astaId);

    // Verifica se l'utente ha già puntato e aggiorna di conseguenza
    const offertaUtente = asta.offerte.find(offerta => offerta.offerente.toString() === userId);
    if (offertaUtente) {
      offertaUtente.importoOfferta = puntata;
    } else {
      asta.offerte.push({ offerente: userId, importoOfferta: puntata });
    }

    // Aggiorna il prezzo corrente
    asta.prezzoCorrente = puntata;

    // Salva l'asta aggiornata nel database
    await asta.save();

    return { success: true, message: 'Prezzo aggiornato con successo' };
  } catch (error) {
    console.error('Errore durante l\'aggiornamento del prezzo:', error);
    return { success: false, message: 'Errore durante l\'aggiornamento del prezzo' };
  }
}



module.exports.addAsta = async (req, res) => {
    try {
      const nuovaAsta = new Asta({
        nomeProdotto: req.body.nomeProdotto,
        descrizioneProdotto: req.body.descrizioneProdotto,
        prezzoPartenza: req.body.prezzoPartenza,
        dataInizio: req.body.dataInizio,
        dataFine: req.body.dataFine,
      });
  
      const astaSalvata = await nuovaAsta.save();
      res.status(201).json(astaSalvata);
    } catch (error) {
      console.error('Errore durante l\'inserimento dell\'asta:', error);
      res.status(500).json({ errore: 'Errore durante l\'inserimento dell\'asta'});
    }
};