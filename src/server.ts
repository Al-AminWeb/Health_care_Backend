import app from "./app";


const bootstrap = async () => {
    try{
        app.listen(5000,()=>{
            console.log("server is running on port 5000");
        })
    }catch (e) {
        console.log("Failed to start server",e);
    }
}
bootstrap();