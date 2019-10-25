const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/public/uploads',express.static('public/uploads'))

//controllers
const AuthController = require('./controllers/auth')
const WebtoonController = require('./controllers/webtoons')
const EpisodeController = require('./controllers/episodes')
const FavoriteController = require('./controllers/favorites')
const ImageController = require('./controllers/images')

//middlewares
const { authenticated } = require('./middleware')
//multer
const {upload}  = require('./upload')

app.group("/api/v1", (router) => {
    
    //Auth
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)    
    
    //Update User
    router.post('/profile/edit',authenticated,upload.single('profileImage'),AuthController.edit)


    //webtoon API
    router.get('/webtoons',authenticated, WebtoonController.index)    
    router.get('/webtoon/search/:keyword',authenticated, WebtoonController.search)
    router.get('/webtoon/:id',authenticated, WebtoonController.show)    
    router.get('/webtoon/my/:id',authenticated, WebtoonController.mywebtoon)    
    router.post('/webtoon',authenticated,upload.single('img_banner'), WebtoonController.store)    
    router.patch('/webtoon/:id',authenticated, WebtoonController.update)    
    router.delete('/webtoon/:id',authenticated, WebtoonController.delete)
    
    //episode API
    router.get('/episodes',authenticated, EpisodeController.index)    
    router.get('/episode/:id',authenticated, EpisodeController.show)    
    router.post('/episode',authenticated, EpisodeController.store)    
    router.patch('/episode/:id',authenticated, EpisodeController.update)    
    router.delete('/episode/:id',authenticated, EpisodeController.delete)


    //favorite API
    router.get('/favorites/:id',authenticated, FavoriteController.index)    
    router.get('/favorite/:id',authenticated, FavoriteController.show)    
    router.post('/favorite',authenticated, FavoriteController.store)    
    router.patch('/favorite/:id',authenticated, FavoriteController.update)    
    router.delete('/favorite/:id',authenticated, FavoriteController.delete)

    //Image API
    router.get('/images',authenticated, ImageController.index)    
    router.get('/image/:id',authenticated, ImageController.show)    
    router.post('/image',authenticated, ImageController.store)    
    router.patch('/image/:id',authenticated, ImageController.update)    
    router.delete('/image/:id',authenticated, ImageController.delete)    

})


app.listen(process.env.PORT||9876,function(){console.log('Listening on Our port!')});