import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Tenant from './models/Tenant.js';

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Create tenants
  const tenants = ['Acme', 'Globex'];
  for (let t of tenants) {
    await Tenant.findOneAndUpdate({ name: t }, { name: t, plan: 'Free' }, { upsert: true });
  }

  const password = await bcrypt.hash('password', 10);

  const users = [
    { email: 'admin@acme.test', password, role: 'Admin', tenant: 'Acme' },
    { email: 'user@acme.test', password, role: 'Member', tenant: 'Acme' },
    { email: 'admin@globex.test', password, role: 'Admin', tenant: 'Globex' },
    { email: 'user@globex.test', password, role: 'Member', tenant: 'Globex' },
  ];

  for (let u of users) {
    await User.findOneAndUpdate({ email: u.email }, u, { upsert: true });
  }

  console.log('Seed completed');
  process.exit();
};

run();
