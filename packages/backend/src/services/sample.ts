import { IService } from 'src/handler/middleware';
import { sampleRepo } from 'src/repository/sample';

export const sampleService: IService<string[]> = async () => {
    const result = await sampleRepo();
    return result;
};
