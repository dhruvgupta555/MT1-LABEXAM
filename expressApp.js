import express from 'express';

const app = express();
const PORT = 4000;

app.use(express.json());

// Sample employee tasks
let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending",
        priority: "High"
    },
    {
        id: 2,
        taskName: "Create Dashboard",
        assignedTo: "Amit Kumar",
        status: "In Progress",
        priority: "Medium"
    },
    {
        id: 3,
        taskName: "Test REST API",
        assignedTo: "Priya Singh",
        status: "Completed",
        priority: "Low"
    }
];

// GET all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// GET task by ID
app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
});

// POST new task
app.post('/tasks', (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;

    if (
        id === undefined ||
        !taskName?.trim() ||
        !assignedTo?.trim() ||
        !status?.trim() ||
        !priority?.trim()
    ) {
        return res.status(400).json({
            message: "All task fields are required"
        });
    }

    if (tasks.some(t => t.id === Number(id))) {
        return res.status(400).json({
            message: "Task ID already exists"
        });
    }

    const newTask = {
        id: Number(id),
        taskName,
        assignedTo,
        status,
        priority
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task added successfully",
        task: newTask
    });
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { taskName, assignedTo, status, priority } = req.body;

    tasks[index] = {
        ...tasks[index],
        ...(taskName !== undefined && { taskName }),
        ...(assignedTo !== undefined && { assignedTo }),
        ...(status !== undefined && { status }),
        ...(priority !== undefined && { priority })
    };

    res.status(200).json({
        message: "Task updated successfully",
        task: tasks[index]
    });
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(index, 1)[0];

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask
    });
});

// Invalid routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});