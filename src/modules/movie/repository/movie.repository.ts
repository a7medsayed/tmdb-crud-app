import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Movie, MovieDocument } from "../schema/movie.schema";

@Injectable()
export class MovieRepository {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>
  ) {}

  async createMany(movies: Partial<Movie>[]): Promise<MovieDocument[]> {
    return this.movieModel.insertMany(movies, { ordered: false });
  }

  async existsById(id: number): Promise<boolean> {
    return !!(await this.movieModel.exists({ id }));
  }

  async findByObjectIds(ids: Types.ObjectId[]): Promise<MovieDocument[]> {
    return this.movieModel.find({ _id: { $in: ids } }).exec();
  }

  async findByIds(ids: number[]): Promise<MovieDocument[]> {
    return this.movieModel.find({ id: { $in: ids } }).exec();
  }

  async findWithPagination(
    query: any,
    options: {
      page?: number;
      limit?: number;
      sort?: any;
      projection?: any;
    }
  ) {
    const page = options.page || 1;
    const limit = options.limit || 25;
    const sort = options.sort || { createdAt: -1 };
    const projection = options.projection || {};

    const [docs, total] = await Promise.all([
      this.movieModel
        .find(query, projection)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.movieModel.countDocuments(query),
    ]);

    return {
      docs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByObjectIdsPaginated(
    ids: Types.ObjectId[],
    page = 1,
    limit = 10
  ): Promise<{
    docs: MovieDocument[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      this.movieModel
        .find({ _id: { $in: ids } })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.movieModel.countDocuments({ _id: { $in: ids } }),
    ]);
    return {
      docs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
