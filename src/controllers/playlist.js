const uuid = require("uuid");
const Playlists = require("../models/playlist");
const { getTracksByPlaylist } = require("./track");

const getPlaylistById = async (playlistId) => {
  const playlist = await Playlists.findOne({
    where: {
      id: playlistId,
    },
  });
  
  if(!playlist) return null

  const tracks = await getTracksByPlaylist(playlistId);

  const responsePlaylist = {
    title: playlist.title,
    message: playlist.message,
    from: playlist.from,
    to: playlist.to,
    tracks: tracks.tracks,
    UserId: playlist.UserId,
  };

  return responsePlaylist;
};

const getAllPlaylistsByUser = async (userId) => {
  const playlists = await Playlists.findAll({
    where: {
      UserId: userId,
    },
  });

  const playlistsComplete = await Promise.all(
    playlists.map(async (playlist) => {
      const playlistComplete = await getPlaylistById(playlist.id);
      return playlistComplete;
    })
  );

  return playlistsComplete;
};

const createPlaylist = async (UserId, playlistInfo) => {
  const newPlaylist = await Playlists.create({
    id: uuid.v4(),
    UserId,
    ...playlistInfo,
  });

  return newPlaylist
};

const deletePlaylist = async (playlistId) => {
  const response = await Playlists.destroy({
    where: {
      id: playlistId,
    },
  });

  return response;
};

module.exports = {
  getPlaylistById,
  createPlaylist,
  getAllPlaylistsByUser,
  deletePlaylist,
};