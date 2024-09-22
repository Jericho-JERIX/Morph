name="Morph"
npm install
npx prisma migrate dev
npm run build
pm2 delete $name
pm2 start npm --name $name -- start