const express = require('express');
const path = require('path');
const {v4} =require('uuid');
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'client')));

let CONTACTS =[
  {id: v4(), name: 'Михаил', value: '+7-921-100-20-30', marked: false}
];

app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS);
  }, 1500);
});

app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(item => item.id !== req.params.id);
  res.status(200).json({message: 'Элемент удален'});
});

app.put('/api/contacts/:id', (req, res) => {
  const idx =CONTACTS.findIndex(item => item === req.params.id);
  CONTACTS[idx] =req.body;
  res.json(CONTACTS[idx]);
});

app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false};
  CONTACTS.push(contact);
res.status(201).json(contact);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server started...');
});