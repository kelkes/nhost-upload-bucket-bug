# nhost-upload-bucket-bug

nhost up

check bucket table for `test` bucket (should be created via migrations)

create user via https://local.dashboard.nhost.run/local/local

cd test-app

npm i

npm run dev to start next.js app

log in

open console

upload file

...

weird thing is...in the response the bucketId is set.. the file still ends up in the default bucket though.

the network tab shows that it's still in the default bucket
