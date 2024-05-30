import { CheckEvent, ForgeContext, PullRequestGetResponse } from "./types";
import api, { route } from "@forge/api";

export const run = async (event: CheckEvent, context: ForgeContext) => {
    const workspaceUuid = event.workspace.uuid;
    const repoUuid = event.repository.uuid;
    const prId = event.pullrequest.id;

    const res = await api
        .asApp()
        .requestBitbucket(
            route`/2.0/repositories/${workspaceUuid}/${repoUuid}/pullrequests/${prId}`
        );

    const pr: PullRequestGetResponse = await res.json();

    let message = "No Actions Taken";
    let success = true;

    const sourceBranch = pr.source.branch.name;
    const destinationBranch = pr.destination.branch.name;

    if (
        destinationBranch == "production" &&
        sourceBranch.startsWith("develop")
    ) {
        message = "Able to merge to production";
        success = true;
    } else if (
        destinationBranch == "production" &&
        !sourceBranch.startsWith("develop")
    ) {
        message =
            "Cannot merge PR to Production unless source starts with develop";
        success = false;
    } else {
        message = "Able to merge non-production PR";
        success = true;
    }

    return {
        success,
        message,
    };
};
