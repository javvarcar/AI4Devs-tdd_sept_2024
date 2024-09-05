import { Request, Response } from 'express';
import { addCandidateController } from './candidateController';
import * as candidateService from '../../application/services/candidateService';

jest.mock('../../application/services/candidateService', () => ({
    addCandidate: jest.fn(),
    getCandidateById: jest.fn(),
}));

const mockRequest = (params: any, body: any = {}): Partial<Request> => ({
    params,
    body,
});

const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('addCandidateController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add a candidate successfully and return status 201 with a success message', async () => {
        const candidateData = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
        const savedCandidate = { id: 1, ...candidateData };
        (candidateService.addCandidate as jest.Mock).mockResolvedValue(savedCandidate);

        const req = mockRequest({}, candidateData);
        const res = mockResponse();

        await addCandidateController(req as Request, res as Response);

        expect(candidateService.addCandidate).toHaveBeenCalledWith(candidateData);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Candidate added successfully',
            data: savedCandidate,
        });
    });

    it('should handle validation errors and return status 400 with an error message', async () => {
        const candidateData = { firstName: 'John', email: 'invalid-email' };
        (candidateService.addCandidate as jest.Mock).mockRejectedValue(new Error('Invalid email'));

        const req = mockRequest({}, candidateData);
        const res = mockResponse();

        await addCandidateController(req as Request, res as Response);

        expect(candidateService.addCandidate).toHaveBeenCalledWith(candidateData);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error adding candidate',
            error: 'Invalid email',
        });
    });

    it('should handle unique constraint errors and return status 400 with an error message', async () => {
        const candidateData = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
        (candidateService.addCandidate as jest.Mock).mockRejectedValue(new Error('The email already exists in the database'));

        const req = mockRequest({}, candidateData);
        const res = mockResponse();

        await addCandidateController(req as Request, res as Response);

        expect(candidateService.addCandidate).toHaveBeenCalledWith(candidateData);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error adding candidate',
            error: 'The email already exists in the database',
        });
    });

    it('should handle unknown errors and return status 400 with a generic error message', async () => {
        const candidateData = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
        (candidateService.addCandidate as jest.Mock).mockRejectedValue({});

        const req = mockRequest({}, candidateData);
        const res = mockResponse();

        await addCandidateController(req as Request, res as Response);

        expect(candidateService.addCandidate).toHaveBeenCalledWith(candidateData);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error adding candidate',
            error: 'Unknown error',
        });
    });
});


