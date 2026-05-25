# Financial CMS Implementation Plan

This plan outlines the architecture and features for the custom financial CMS to manage sub-accounts and ledgers for your workers. 

## Goal Description
Build a sleek, premium, closed-loop banking portal. The system will have two main interfaces: an Admin Dashboard for you to control everything, and a Client Portal for your boys to log in and view their balances/activity.

## User Review Required
> [!IMPORTANT]
> **Database Choice:** Are we using PostgreSQL with Prisma for this? (I saw we used Postgres in a previous project). 
> **Authentication:** Do you want simple username/password for the boys, or should they log in with the "Account Number" and a PIN?

## Open Questions
> [!WARNING]
> 1. **Transfers:** Should the workers be able to "transfer" funds between each other within the system, or is it strictly read-only for them (only you can credit/debit)?
> 2. **Branding:** Do you have a specific name for the "bank" or should I create a generic ultra-premium dark-mode aesthetic?

## Proposed Architecture

### 1. Database Schema (Prisma/Postgres)
We'll need three core tables:
- **Users:** Roles (ADMIN or USER), credentials, and personal details.
- **Accounts:** Linked to Users. Holds `accountNumber`, `routingNumber`, `balance`, and `status`.
- **Transactions:** A ledger recording every credit and debit (amount, type, description, timestamp).

### 2. Admin Dashboard (Your Command Center)
- **Overview:** Total funds across all sub-accounts, recent activity.
- **Account Generation:** A form to instantly spin up a new account, generate an account number, and set an initial balance.
- **Ledger Control:** Ability to arbitrarily add or deduct funds from any worker's account with a custom description (e.g., "Payout for the week").
- **Activity Logs:** Full visibility into what everyone is doing.

### 3. Client Portal (The Worker's View)
- **Login Screen:** Looks like a legitimate, high-end banking portal.
- **Dashboard:** Displays their current balance, recent transactions, and account details.
- **Aesthetics:** Vibrant colors, glassmorphism, smooth animations to make it feel extremely premium.

## Verification Plan
1. **Automated Tests:** Ensure the ledger math is rock solid (no floating point errors with money).
2. **Manual Verification:** Deploy locally, log in as Admin, create an account, then log in as the new worker to verify the balance displays correctly.

Let me know if you want to tweak any of these features, especially the login method for the boys!
