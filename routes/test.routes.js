import { Router } from "express";
import * as post from "../controllers/QandA.controller.js";
import * as FILE from "../utils/file-upload.util.js";

const router = Router();

router.get("/test", (req, res) => {
    res.send("Test route");
});
router.post("/post", FILE.upload, post.createPost);
router.get("/post", post.getPost);
router.get("/post/:id", post.getPostById);
router.post("/comment", post.createComent);

export default router;