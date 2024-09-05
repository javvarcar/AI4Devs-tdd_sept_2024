import { addCandidate } from './candidateService';
import { validateCandidateData } from '../validator';
import { Candidate } from '../../domain/models/Candidate';
import { Education } from '../../domain/models/Education';
import { WorkExperience } from '../../domain/models/WorkExperience';
import { Resume } from '../../domain/models/Resume';

jest.mock('../validator');
jest.mock('../../domain/models/Candidate');
jest.mock('../../domain/models/Education');
jest.mock('../../domain/models/WorkExperience');
jest.mock('../../domain/models/Resume');

const MockedCandidate = jest.mocked(Candidate);
const MockedEducation = jest.mocked(Education);
const MockedWorkExperience = jest.mocked(WorkExperience);
const MockedResume = jest.mocked(Resume);

describe('CandidateService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addCandidate', () => {
        it('should validate candidate data', async () => {
            const candidateData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '1234567890',
                address: '123 Main St',
                educations: [],
                workExperiences: [],
                cv: {}
            };

            // Mock save method to return an object with an id
            const mockSave = jest.fn().mockResolvedValue({ id: 1, ...candidateData });
            MockedCandidate.mockImplementation((data) => ({
                ...data,
                save: mockSave,
                education: [],
                workExperience: [],
                resumes: []
            }));

            await addCandidate(candidateData);
            expect(validateCandidateData).toHaveBeenCalledWith(candidateData);
        });

        it('should create a new candidate', async () => {
            const candidateData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '1234567890',
                address: '123 Main St',
                educations: [{ degree: 'BSc' }],
                workExperiences: [{ company: 'Company' }],
                cv: { fileName: 'resume.pdf' }
            };

            // Mock save methods for Candidate, Education, WorkExperience, and Resume
            const mockSaveCandidate = jest.fn().mockResolvedValue({ id: 1, ...candidateData });
            const mockSaveEducation = jest.fn().mockResolvedValue({ id: 1, degree: 'BSc', candidateId: 1 });
            const mockSaveWorkExperience = jest.fn().mockResolvedValue({ id: 1, company: 'Company', candidateId: 1 });
            const mockSaveResume = jest.fn().mockResolvedValue({ id: 1, fileName: 'resume.pdf', candidateId: 1 });

            MockedCandidate.mockImplementation((data) => ({
                ...data,
                save: mockSaveCandidate,
                education: [],
                workExperience: [],
                resumes: []
            }));

            MockedEducation.mockImplementation((data) => ({
                ...data,
                save: mockSaveEducation
            }));

            MockedWorkExperience.mockImplementation((data) => ({
                ...data,
                save: mockSaveWorkExperience
            }));

            MockedResume.mockImplementation((data) => ({
                ...data,
                save: mockSaveResume
            }));

            const result = await addCandidate(candidateData);
            expect(mockSaveCandidate).toHaveBeenCalled();
            expect(mockSaveEducation).toHaveBeenCalled();
            expect(mockSaveWorkExperience).toHaveBeenCalled();
            expect(mockSaveResume).toHaveBeenCalled();
            expect(result).toEqual({ id: 1, ...candidateData });
        });

        it('should handle validation errors', async () => {
            const candidateData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'invalid-email',
                phone: '1234567890',
                address: '123 Main St',
                educations: [],
                workExperiences: [],
                cv: {}
            };

            // Mock validateCandidateData to throw an error
            (validateCandidateData as jest.Mock).mockImplementation(() => {
                throw new Error('Invalid email');
            });

            await expect(addCandidate(candidateData)).rejects.toThrow('Invalid email');
        });


    });
});