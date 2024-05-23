import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="2xl" mb={6}>
          Todo App
        </Heading>
        <Flex width="100%" mb={4}>
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            mr={2}
          />
          <Button onClick={addTask} colorScheme="teal">
            Add Task
          </Button>
        </Flex>
        <List spacing={3} width="100%">
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bg="gray.100"
              p={2}
              borderRadius="md"
            >
              {editingIndex === index ? (
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  mr={2}
                />
              ) : (
                <Checkbox
                  isChecked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  mr={2}
                >
                  <Text as={task.completed ? "s" : ""}>{task.text}</Text>
                </Checkbox>
              )}
              {editingIndex === index ? (
                <Button onClick={() => saveTask(index)} colorScheme="teal" mr={2}>
                  Save
                </Button>
              ) : (
                <Button onClick={() => startEditing(index)} colorScheme="blue" mr={2}>
                  Edit
                </Button>
              )}
              <IconButton
                aria-label="Delete task"
                icon={<FaTrash />}
                onClick={() => deleteTask(index)}
                colorScheme="red"
              />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;