import { env } from "../utils/env";

export async function loginAndVerify(loginAs: 'user' | 'admin', {
    loginReady, dashboardPage
}: any) {
    console.log(`Login as ${loginAs} and verify...`)
    if (loginAs === 'user')
        await loginReady.loginUser(env.userEmail, env.userPassword);
    else
        await loginReady.loginUser(env.adminEmail, env.adminPassword);
    
    await dashboardPage.verifyDashboardPage();
}