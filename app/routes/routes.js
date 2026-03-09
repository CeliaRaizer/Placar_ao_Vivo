const express = require("express");

module.exports = (app, jogoController) => {

    const router = express.Router();

    router.post("/golA", (req, res) => jogoController.golA(req, res));

    router.post("/golB", (req, res) => jogoController.golB(req, res));

    router.post("/definir-times", (req, res) =>
        jogoController.definirTimes(req, res)
    );

    return router;

};