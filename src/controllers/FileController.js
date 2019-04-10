const File = require('../models/File');
const Box = require('../models/Box');

class FileController{
    async store(req, res){
        const box = Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);
    
        await box.save()
        //criar um arquivo
        // console.log(file)
        req.io.sockets.in(box._id).emit('file', file);
        return res.send(file);
    }
}

module.exports = new FileController();