const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const htmlRoutes = require('./routes/htmlRoutes.js')

app.use('/api', htmlRoutes);
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes.js')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
