module.exports = {
    getIndexPage(req,res){
      res.render('index');
    },
    getListPage(req,res){
      res.render('list');
    },
    getDetailPage(req,res){
      res.render('detail');
    }
}