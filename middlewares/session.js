function verificarSesion(req, res, cb) {
    if (req.session.password) cb();
    else res.redirect("/");
}

module.exports=verificarSesion;