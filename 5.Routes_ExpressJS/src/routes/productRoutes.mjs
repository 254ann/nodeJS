import  {Router} from "express"

const router = Router()

router.get('/', (req, res) => {
    res.send({message: "Products router"} )
})

export default router