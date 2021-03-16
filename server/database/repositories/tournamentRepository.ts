/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mongoose } from 'mongoose';
import Tournament from '../../models/tournament';
import TournamentModel from '../models/tournamentModel';

class TournamentRepository {
  public Collection : typeof TournamentModel;

  constructor() { this.Collection = TournamentModel; }

  async create(tournament : Tournament) {
    const document = new this.Collection(tournament);
    return document.save();
  }
}
