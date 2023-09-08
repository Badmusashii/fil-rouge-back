import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Member } from 'src/member/entities/member.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewsRepository: Repository<Review>
  ){}
  async create(createReviewDto: CreateReviewDto, member:Member) {
    const newReview = this.reviewsRepository.create({
      ...createReviewDto, member,
    });
    return await this.reviewsRepository.save(newReview);
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
