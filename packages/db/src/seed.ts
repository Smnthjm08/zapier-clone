import { prisma } from ".";

const EXISTING_USER_ID = "sCTbYV50SkSfjdMZ9JoyYTbwz56t4Khv";

async function main() {
    const availableTrigger = await prisma.availableTrigger.create({
        data: {
            name: "Webhook Trigger",
            image: "webhook.png",
        },
    });

    const emailAction = await prisma.availableAction.create({
        data: {
            name: "Send Email",
            image: "email.png",
        },
    });

    const slackAction = await prisma.availableAction.create({
        data: {
            name: "Send Slack Message",
            image: "slack.png",
        },
    });

    const zap = await prisma.zap.create({
        data: {
            name: "Local Dev Zap",
            description: "Zap with ordered actions for testing",
            userId: EXISTING_USER_ID,
        },
    });

    await prisma.trigger.create({
        data: {
            zapId: zap.id,
            typeId: availableTrigger.id,
            metadata: {
                event: "webhook.received",
                env: "local",
            },
        },
    });

    await prisma.action.createMany({
        data: [
            {
                zapId: zap.id,
                typeId: emailAction.id,
                sortingOrder: 1,
                metadata: {
                    to: "test@example.com",
                    subject: "Welcome!",
                },
            },
            {
                zapId: zap.id,
                typeId: slackAction.id,
                sortingOrder: 2,
                metadata: {
                    channel: "#general",
                    message: "Zap executed 🚀",
                },
            },
        ],
    });

    const zapRun = await prisma.zapRun.create({
        data: {
            zapId: zap.id,
            metadata: {
                status: "PENDING",
                triggeredAt: new Date().toISOString(),
                source: "local-dev",
            },
        },
    });

    await prisma.zapRunOutbox.create({
        data: {
            zapRunId: zapRun.id,
        },
    });

    console.log("dummy data created with sorting order!");
    console.log({
        zapId: zap.id,
        zapRunId: zapRun.id,
    });
}

main()
    .catch(console.error)
    .finally(() => console.log("done!"));
