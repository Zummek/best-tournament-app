/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mongoose } from 'mongoose';
import Team from '../../models/team';
import TeamModel from '../models/teamModel';

class TeamRepository {
  public Collection : typeof TeamModel;

  constructor() { this.Collection = TeamModel; }

  async create(team : Team) {
    const document = new this.Collection(team);
    return document.save();
  }
}
