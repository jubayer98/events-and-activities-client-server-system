import { adminService } from '../modules/admin/admin.service';
import { seedConfig } from '../config/seed.config';

/**
 * Seeds the default admin user on server startup
 * Creates admin in users collection with role 'admin'
 * Generates JWT token for authentication
 * 
 * @returns {Promise<void>}
 */
export const seedDefaultAdmin = async (): Promise<void> => {
  try {
    const result = await adminService.seedDefaultAdmin();

    if (!result.created) {
      console.log(`ℹ️  ${result.message}`);
      return;
    }

    const { firstName, lastName, email, password } = seedConfig.admin;

    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        Default Admin Created Successfully                 ║');
    console.log('╠═══════════════════════════════════════════════════════════╣');
    console.log(`║ First Name: ${(firstName || '').padEnd(42)}║`);
    console.log(`║ Last Name:  ${(lastName || '').padEnd(42)}║`);
    console.log(`║ Email:      ${(email || '').padEnd(42)}║`);
    console.log(`║ Password:   ${(password || '').padEnd(42)}║`);
    console.log('╠═══════════════════════════════════════════════════════════╣');

  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Failed to seed default admin:', error.message);
    } else {
      console.error('❌ Failed to seed default admin:', error);
    }
  }
};
