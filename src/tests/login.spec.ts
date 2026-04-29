import { UserTestData } from '../utils/test-data/user-test-data';
import { test } from './fixtures/auth.fixture';

// Runs tests sequentially
test.describe.configure({ mode: 'serial' });

test.describe('Login Page Tests', () => {
    test('Submission of blank form', async ({ loginReady }) => {
        const alertPromise = loginReady.verifyErrorMessage('email and password');

        await loginReady.loginUser('', '');

        await alertPromise;
    });

    test('Login with invalid credentials', async ({ loginReady }) => {
        const alertPromise = loginReady.verifyErrorMessage('invalid');

        const userTestData = new UserTestData();

        await loginReady.loginUser(userTestData.email, userTestData.weakPassword);

        await alertPromise;
    });

    test('Login with valid credentials - Admin', async ({ adminDashboard: _adminDashboard }) => {});

    test('Login with valid credentials - User', async ({ userDashboard: _userDashboard }) => {});
});
