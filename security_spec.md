# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Singleton Portal Configuration (`/portal_settings/{settingId}`)**:
   - `settingId` must match `^[a-zA-Z0-9_\-]+$` and be at most 128 characters (`main`).
   - Public visitors (`get`) can read `/portal_settings/{settingId}` so all students immediately see the current APK download link (hosted on Cloudflare R2), version, notice, and release notes without signing in.
   - Only a verified administrator (`isAdmin()`) can `create` or `update` `/portal_settings/{settingId}` with full configuration changes, OR any visitor/user can perform a strictly scoped `incrementDownloadCount` action that ONLY modifies `downloadCount` by `+1` and `updatedAt == request.time`.
   - Every string field enforces strict `.size()` bounds matching `firebase-blueprint.json`.
   - `createdAt` and `ownerId` are immutable once created (`incoming().createdAt == existing().createdAt` and `incoming().ownerId == existing().ownerId`).
   - Timestamps (`createdAt`, `updatedAt`) must strictly match `request.time`.

2. **Admin Registry (`/admins/{adminId}`)**:
   - No client-side self-promotion is allowed unless the authenticated user's verified email matches the bootstrapped owner email (`maiafahim1234@gmail.com` with `email_verified == true`) and `adminId == request.auth.uid`.

## 2. The "Dirty Dozen" Payloads
1. **Shadow Field Injection (`isVerified: true`)**: Extra key not in `hasOnly()` allowlist -> `PERMISSION_DENIED`.
2. **Unverified Admin Email Spoof (`email_verified: false`)**: Matching admin email without email verification -> `PERMISSION_DENIED`.
3. **Owner ID Spoofing on Create (`ownerId != request.auth.uid`)**: Setting another user's UID as ownerId -> `PERMISSION_DENIED`.
4. **Immutable Field Mutation (`createdAt` or `ownerId` changed on update)**: Modifying `createdAt` or `ownerId` -> `PERMISSION_DENIED`.
5. **Forged Client Timestamp (`updatedAt != request.time`)**: Passing an arbitrary past/future timestamp -> `PERMISSION_DENIED`.
6. **Oversized String DoW Attack (`noticeText` > 500 chars)**: Exceeding `maxLength` -> `PERMISSION_DENIED`.
7. **Invalid Path Variable (`settingId` with spaces/slashes or > 128 chars)**: Fails `isValidId()` -> `PERMISSION_DENIED`.
8. **Type Poisoning (`downloadCount: "99999"`)**: Passing string instead of int/number -> `PERMISSION_DENIED`.
9. **Arbitrary Download Count Jump by Non-Admin (`downloadCount` + 5000)**: Non-admin trying to jump counter by more than +1 -> `PERMISSION_DENIED`.
10. **Non-Admin APK URL Hijack**: Unauthenticated or non-admin user trying to change `apkDownloadUrl` -> `PERMISSION_DENIED`.
11. **Privilege Escalation in `/admins/{adminId}`**: Non-owner user attempting to create an admin doc -> `PERMISSION_DENIED`.
12. **Document Deletion on `/portal_settings/main`**: Attempting to delete the live portal config -> `PERMISSION_DENIED`.
