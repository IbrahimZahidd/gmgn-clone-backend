import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private db: admin.database.Database;
  private readonly logger = new Logger(FirebaseService.name);

  onModuleInit() {
    try {
      const serviceAccountPath = path.join(
        __dirname,
        '../../Firebase Stuff/gmgn-clone-database-firebase-adminsdk-lqfu4-1836c48628.json',
      );

      admin.initializeApp({
        credential: admin.credential.cert(require(serviceAccountPath)),
        databaseURL: 'https://gmgn-clone-database-default-rtdb.firebaseio.com',
      });

      this.db = admin.database();
      this.logger.log('Firebase initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Firebase:', error);
      throw error;
    }
  }

  async saveCoinsData(data: any[]): Promise<boolean> {
    try {
      this.logger.log('Saving coins data to Firebase...');
      await this.db.ref('trending/coins').set(data);
      this.logger.log('Data saved successfully');
      return true;
    } catch (error) {
      this.logger.error('Error saving to Firebase:', error);
      throw error;
    }
  }

  async getCoinsData(): Promise<any[]> {
    try {
      this.logger.log('Fetching coins data from Firebase...');
      const snapshot = await this.db.ref('trending/coins').once('value');
      const data = snapshot.val();
      this.logger.log('Data fetched successfully');
      return data || [];
    } catch (error) {
      this.logger.error('Error fetching from Firebase:', error);
      throw error;
    }
  }
}
