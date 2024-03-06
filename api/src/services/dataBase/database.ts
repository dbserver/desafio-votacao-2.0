import { DataSource, QueryRunner } from 'typeorm';
import dataSource from './../../../ormconfig';
import logger from '../logger/logger';

export default abstract class Database {
    static connection: DataSource
    static queryRunner: QueryRunner


    static async Init() {
        const connection = dataSource
        try {
            await connection.initialize()
            this.connection = connection

            await connection.runMigrations()
            this.queryRunner = this.connection.createQueryRunner()
            return connection;
        }
        catch (e) {
            throw e;
        }
    }

    static getManager() {
        return this.queryRunner.manager
    }

    static getConnection() {
        return this.connection
    }

    static getQueryRunner() {
        return this.queryRunner
    }

    static async startTransaction() {
        await this.queryRunner.startTransaction()
        logger.log('info', "startTransaction")
    }

    static async rollbackTransaction() {
        await this.queryRunner.rollbackTransaction()
        logger.log('info', "rollbackTransaction")
    }

    static async destroy() {
        return await this.connection.destroy()
    }
}