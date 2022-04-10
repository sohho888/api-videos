import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
const corsMiddleware = cors()

app.use(corsMiddleware)

const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = 5000

// type ErrorMessageType = {
//     message: string | null
//     field: string | null
// }

// type PostType = {
//     id: number
//     title: string | null
//     shortDescription: string | null
//     content: string | null
//     bloggerId: number
//     bloggerName: string | null
// }
//
// type BloggerType = {
//     id: number
//     name: string | null
//     youtubeUrl: string | null
// }
//
// const blogger: BloggerType[] = [
//     { id: 1, name: "Mike", youtubeUrl: "https://www.youtube.com/watch?v=WhcbmFplnQA" },
//     { id: 2, name: "Sara", youtubeUrl: "https://www.youtube.com/watch?v=WhcbmF" }
// ]



app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id)
 
if(id === NaN){
    res.send(400);
} else {
    if (video) {
        res.send(video);
    } else {
        res.send(404);
    }
}
    
    
})

app.post('/videos', (req: Request, res: Response) => {

    if (!req.body.title) {
        res.status(400)
        res.send({
            message: "title not entered",
            field: "title"
        })
        return
    }

    if (req.body.title.length > 40) {
        res.status(400)
        res.send({
            message: "title length more 40",
            field: "title"
        })
        return
    }

    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }

    videos.push(newVideo)
    
    res.status(201)
    res.send(newVideo)

})

app.put('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id)


    if (!id && id === NaN) {
        res.status(400)
        res.send({
            message: "input correct data",
            field: "title",
        })
        return
    }

    if (video) {
        video.title = req.body.title;
        res.status(201)
        res.send(video)
    } else {
        res.status(404);
        res.send({
            "data": {},
            "message": "title length more 40",
            "field": "title"
        })
    }

})

app.delete('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const newVideos = videos.filter(v => v.id !== id)
    if (newVideos.length < videos.length) {
        videos = newVideos;
        res.status(204).send(videos);
    }
    else {
        res.send('404')
    }

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


let videos = [
    { id: 1, title: 'About JS - 01', author: 'it-incubator.eu' },
    { id: 2, title: 'About JS - 02', author: 'it-incubator.eu' },
    { id: 3, title: 'About JS - 03', author: 'it-incubator.eu' },
    { id: 4, title: 'About JS - 04', author: 'it-incubator.eu' },
    { id: 5, title: 'About JS - 05', author: 'it-incubator.eu' },
]  
