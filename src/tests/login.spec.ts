import { UserTestData } from '../utils/user-test-data';
import { test } from './fixtures/auth.fixture';

test.describe('Login Page Tests', () => {
    test('Submission of blank form', async ({ loginReady }) => {
        const alertPromise = loginReady.verifyErrorMessage('email and password');

        await loginReady.loginUser('', '');

        await alertPromise;
    });

    test('Login with invalid credentials', async ({ loginReady }) => {
        const alertPromise = loginReady.verifyErrorMessage('invalid');

        const user_test_data = new UserTestData();

        await loginReady.loginUser(user_test_data.email, user_test_data.weakPassword);

        await alertPromise;
    });

    test('Login with valid credentials - Admin', async ({ adminDashboard: _adminDashboard }) => {});

    test('Login with valid credentials - User', async ({ userDashboard: _userDashboard }) => {});
});
