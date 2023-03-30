import {getAllPeople,createPerson,getPersonById,deletePerson,updatePerson} from "../controllers/personController";
import express = require('express');

const personRouter = express.Router();

personRouter.route('/').get(getAllPeople).post(createPerson);
personRouter.route('/:id').get(getPersonById).delete(deletePerson).patch(updatePerson)

export default personRouter;