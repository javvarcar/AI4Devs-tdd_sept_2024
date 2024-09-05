import {
    validateName,
    validateEmail,
    validatePhone,
    validateDate,
    validateAddress,
    validateEducation,
    validateExperience,
    validateCV,
    validateCandidateData
} from '../validator'; 

describe('Validator Tests', () => {
    describe('validateName', () => {
        const validNames = ['John Doe', 'Jane Smith'];
        const invalidNames = ['', 'J', 'A'.repeat(101), 'John123'];

        validNames.forEach(name => {
            it(`should validate a correct name: ${name}`, () => {
                expect(() => validateName(name)).not.toThrow();
            });
        });

        invalidNames.forEach(name => {
            it(`should throw an error for an invalid name: ${name}`, () => {
                expect(() => validateName(name)).toThrow('Invalid name');
            });
        });
    });

    describe('validateEmail', () => {
        const validEmails = ['john.doe@example.com', 'jane.smith@domain.com'];
        const invalidEmails = ['', 'john.doe', 'john.doe@com'];

        validEmails.forEach(email => {
            it(`should validate a correct email: ${email}`, () => {
                expect(() => validateEmail(email)).not.toThrow();
            });
        });

        invalidEmails.forEach(email => {
            it(`should throw an error for an invalid email: ${email}`, () => {
                expect(() => validateEmail(email)).toThrow('Invalid email');
            });
        });
    });

    describe('validatePhone', () => {
        const validPhones = ['612345678'];
        const invalidPhones = ['512345678', '61234567', '6123456789'];

        validPhones.forEach(phone => {
            it(`should validate a correct phone number: ${phone}`, () => {
                expect(() => validatePhone(phone)).not.toThrow();
            });
        });

        invalidPhones.forEach(phone => {
            it(`should throw an error for an invalid phone number: ${phone}`, () => {
                expect(() => validatePhone(phone)).toThrow('Invalid phone');
            });
        });
    });

    describe('validateDate', () => {
        const validDates = ['2023-01-01'];
        const invalidDates = ['', '01-01-2023', '2023/01/01'];

        validDates.forEach(date => {
            it(`should validate a correct date: ${date}`, () => {
                expect(() => validateDate(date)).not.toThrow();
            });
        });

        invalidDates.forEach(date => {
            it(`should throw an error for an invalid date: ${date}`, () => {
                expect(() => validateDate(date)).toThrow('Invalid date');
            });
        });
    });

    describe('validateAddress', () => {
        const validAddresses = ['123 Main St'];
        const invalidAddresses = ['A'.repeat(101)];

        validAddresses.forEach(address => {
            it(`should validate a correct address: ${address}`, () => {
                expect(() => validateAddress(address)).not.toThrow();
            });
        });

        invalidAddresses.forEach(address => {
            it(`should throw an error for an invalid address: ${address}`, () => {
                expect(() => validateAddress(address)).toThrow('Invalid address');
            });
        });
    });

    describe('validateEducation', () => {
        it('should validate correct education data', () => {
            const education = {
                institution: 'University',
                title: 'BSc',
                startDate: '2020-01-01',
                endDate: '2023-01-01'
            };
            expect(() => validateEducation(education)).not.toThrow();
        });

        it('should throw an error for invalid education data', () => {
            const invalidEducation = {
                institution: '',
                title: 'BSc',
                startDate: '2020-01-01',
                endDate: '2023-01-01'
            };
            expect(() => validateEducation(invalidEducation)).toThrow('Invalid institution');

            const invalidEducation2 = {
                institution: 'University',
                title: '',
                startDate: '2020-01-01',
                endDate: '2023-01-01'
            };
            expect(() => validateEducation(invalidEducation2)).toThrow('Invalid title');

            const invalidEducation3 = {
                institution: 'University',
                title: 'BSc',
                startDate: '2020-01-01',
                endDate: '2023/01/01'
            };
            expect(() => validateEducation(invalidEducation3)).toThrow('Invalid end date');
        });
    });

    describe('validateExperience', () => {
        it('should validate correct experience data', () => {
            const experience = {
                company: 'Company',
                position: 'Developer',
                startDate: '2020-01-01',
                endDate: '2023-01-01'
            };
            expect(() => validateExperience(experience)).not.toThrow();
        });

        it('should throw an error for invalid experience data', () => {
            const invalidExperience = {
                company: '',
                position: 'Developer',
                startDate: '2020-01-01',
                endDate: '2023-01-01'
            };
            expect(() => validateExperience(invalidExperience)).toThrow('Invalid company');

            const invalidExperience2 = {
                company: 'Company',
                position: '',
                startDate: '2020-01-01',
                endDate: '2023-01-01'
            };
            expect(() => validateExperience(invalidExperience2)).toThrow('Invalid position');

            const invalidExperience3 = {
                company: 'Company',
                position: 'Developer',
                startDate: '2020-01-01',
                endDate: '2023/01/01'
            };
            expect(() => validateExperience(invalidExperience3)).toThrow('Invalid end date');
        });
    });

    describe('validateCV', () => {
        it('should validate correct CV data', () => {
            const cv = {
                filePath: '/path/to/cv.pdf',
                fileType: 'application/pdf'
            };
            expect(() => validateCV(cv)).not.toThrow();
        });

        it('should throw an error for invalid CV data', () => {
            const invalidCV = {
                filePath: '',
                fileType: 'application/pdf'
            };
            expect(() => validateCV(invalidCV)).toThrow('Invalid CV data');

            const invalidCV2 = {
                filePath: '/path/to/cv.pdf',
                fileType: ''
            };
            expect(() => validateCV(invalidCV2)).toThrow('Invalid CV data');
        });
    });

    describe('validateCandidateData', () => {
        it('should validate correct candidate data', () => {
            const candidateData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '612345678',
                address: '123 Main St',
                educations: [{
                    institution: 'University',
                    title: 'BSc',
                    startDate: '2020-01-01',
                    endDate: '2023-01-01'
                }],
                workExperiences: [{
                    company: 'Company',
                    position: 'Developer',
                    startDate: '2020-01-01',
                    endDate: '2023-01-01'
                }],
                cv: {
                    filePath: '/path/to/cv.pdf',
                    fileType: 'application/pdf'
                }
            };
            expect(() => validateCandidateData(candidateData)).not.toThrow();
        });

        it('should throw an error for invalid candidate data', () => {
            const invalidCandidateData = {
                firstName: '',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '612345678',
                address: '123 Main St',
                educations: [{
                    institution: 'University',
                    title: 'BSc',
                    startDate: '2020-01-01',
                    endDate: '2023-01-01'
                }],
                workExperiences: [{
                    company: 'Company',
                    position: 'Developer',
                    startDate: '2020-01-01',
                    endDate: '2023-01-01'
                }],
                cv: {
                    filePath: '/path/to/cv.pdf',
                    fileType: 'application/pdf'
                }
            };
            expect(() => validateCandidateData(invalidCandidateData)).toThrow('Invalid name');
        });
    });
});