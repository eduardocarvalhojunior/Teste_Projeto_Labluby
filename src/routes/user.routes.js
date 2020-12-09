const { Router } = require('express');
const multer = require('multer');
const UserController = require('../controllers/UserController');
const RepositoryController = require('../controllers/RepositoryController');
const RepositoryStarController = require('../controllers/RepositoryStarController');
const FollowController = require('../controllers/FollowController');

const uploadConfig = require('../config/upload');

const upload = multer(uploadConfig);

const userRouter = Router();

userRouter.post('/', UserController.create); // Criar usuario
userRouter.get('/:id', UserController.findOne); // Buscar dados de um usuario
userRouter.patch(
  '/:id/avatar',
  upload.single('avatar'),
  UserController.updateAvatar,
); // Buscar dados de um usuario
userRouter.delete('/:id', UserController.delete); // Deleta um usuario
userRouter.put('/:id', UserController.update); // Atualiza dados de um usuario

// Repository
userRouter.post('/:id/repositories', RepositoryController.create); // Criar repositorio
userRouter.get('/:id/repositories', RepositoryController.findAll); // Pega todos os repositorios de um usuário
userRouter.get('/:id/repositories/:repositoryId', RepositoryController.findOne); // Buscar dados de um repositorio
userRouter.put('/:id/repositories/:repositoryId', RepositoryController.update); // Atualiza dados de um repositorio
userRouter.delete(
  '/:id/repositories/:repositoryId',
  RepositoryController.delete,
); // Deleta um repositorio

// Repositories Like
userRouter.post(
  '/:id/repositories/:repositoryId/star',
  RepositoryStarController.create,
); // Da like em um repositorio
userRouter.delete(
  '/:id/repositories/:repositoryId/star',
  RepositoryStarController.delete,
); // Tirar o like de um repositorio

// Folow
userRouter.post('/:id/follow', FollowController.create); // Seguir um perfil
userRouter.delete('/:id/follow', FollowController.delete); // Desseguior um perfil
userRouter.get('/:id/followers', FollowController.getFollowers); // Seguidores de um perfil
userRouter.get('/:id/followings', FollowController.getFollowings); // Seguindos de um perfil

module.exports = userRouter;
