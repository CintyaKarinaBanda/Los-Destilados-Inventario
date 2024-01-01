function verificarSesion(req, res, cb) {
    console.log();
    if (req.session.password) cb();
    else res.redirect("/");
}

module.exports=verificarSesion;