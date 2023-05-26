require('dotenv').config();
const express = require('express');
const { User, Todo } = require('./db/models/Index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const SALT = process.env.PASSWORD_SALT;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());

let checkUser = (req, res, next) => {
    let response = {}
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        response = {
            status: "ERROR",
            message: "Authorization Failed"
        }
        res.status(401).json(response)
        return
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        console.log(error)
        if (error) {
            response = {
                status: "ERROR",
                message: error
            }
            res.status(401).json(response)
            return
        }
        req.user = user
        next()
  })
}

app.post('/register', async function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        where: {
            email,

        }
    });

    if (user){
        res.status(400);
        res.json({
            error: 'user already exist',
        });

        return;
    }

    const encryptedPassword = bcrypt.hashSync(password, SALT);

    await User.create({
        name,
        email,
        password: encryptedPassword,
    });

    res.json(true);
});

app.post('/login', async function(req, res) {
    const audience = req.header('x-audience');

    if (!audience){
        res.status(400);
        res.json({
            error: 'audience not declared',
        });

        return;
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        where: {
            email,

        }
    });

    if (!user) {
        res.status(400);
        res.json({
            error: 'user not found',
        });

        return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
        res.status(400);
        res.json({
            error: 'wrong password',
        });

        return;
    }

    const token = jwt.sign({
        sub: user.id,
        iss: 'skilvul',
        aud: audience,
        exp: parseInt(((new Date()).getTime()/1000 + 5 * 60 * 60)), 
    }, JWT_SECRET);

    res.json({
        token,
    });
});

app.use(checkUser);

app.get('/todos', async function(req, res) {
    const todos = await Todo.findAll({
        include: {
            model: User,
            as: 'user',
        }
    });
    const response = {
        status: "SUCCESS",
        message: "Get All Todo",
        meta: {
            total: todos.length
        },
        data: todos
    }

    res.status(200).json(response)
    return
});

app.post('/todos', async function(req, res) {
    let response = {}
    let code = 200
    try {
        const newTask = await Todo.create({
            task: req.body.task,
            user_id: Number(req.body.user_id),
            do_at: req.body.do_at
        });
    
        response = {
            status: "SUCCESS",
            message: "Create New Task",
            data: newTask
        }
    } catch(error) {
        code = 422
        response = {
            status: "ERROR",
            message: error.parent.sqlMessage
        }
    }
    

    res.status(code).json(response)
    return
});

app.get('/todos/:id', async function(req, res) {
    let response = {}
    const todos = await Todo.findAll({
        where: {
            id: req.params.id
        }
    });

    if(todos.length == 0) {
        response = {
            status: "SUCCESS",
            message: "Data not Found"
        }
    } else {
        response = {
            status: "SUCCESS",
            message: "Get Detail Task",
            data: todos
        }
    }

    res.status(200).json(response)
    return
});

app.put('/todos/:id', async function(req, res) {
    let response = {}
    let code = 200
    const todos = await Todo.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!todos) {
        response = {
            status: "SUCCESS",
            message: "Data not Found"
        }
    } else {
        todos.task = req.body.task
        todos.user_id = Number(req.body.user_id)
        todos.do_at = Date(req.body.alamat)
        todos.save()
        response = {
            status: "SUCCESS",
            message: "Update Company",
            data: todos
        }
    }

    res.status(code).json(response)
    return
});

app.delete('/todos/:id', async function(req, res) {
    const { id } = req.params;

    try {
    const deletedTodo = await Todo.destroy({
        where: { id: id },
    });

    if (deletedTodo) {
        return res.status(204).send();
    } else {
        return res.status(404).json({ error: 'Task not found' });
    }
    } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/todos/', async function(req, res) {
    try {
        await Todo.destroy({
          where: {},
          truncate: true,
        });
    
        return res.status(204).send();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
      }
});

app.listen(PORT);