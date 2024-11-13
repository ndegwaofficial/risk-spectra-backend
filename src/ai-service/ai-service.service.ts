import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly aiServiceUrl = 'http://localhost:5000';  // Replace with your AI service URL

  async detectFraud(caseData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.aiServiceUrl}/fraud-detection`, caseData);
      return response.data;
    } catch (error) {
      throw new HttpException('Error calling AI service', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}