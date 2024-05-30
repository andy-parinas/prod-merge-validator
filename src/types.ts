type BitbucketResource = {
    uuid: string;
};

type PullRequestEvent = {
    id: number;
    source: {
        branch: {
            name: string;
        };
    };
};

/**
 * Merge checks are invoked by triggers.
 * https://developer.atlassian.com/platform/forge/manifest-reference/modules/bitbucket-merge-check/#triggers
 */
type Trigger = {
    type: "pre-merge" | "on-merge";
};

export type CheckEvent = {
    workspace: BitbucketResource;
    repository: BitbucketResource;
    pullrequest: PullRequestEvent;
    trigger: Trigger;
};

export type ForgeContext = {
    installContext: string;
    workspaceId: string;
};

export type PullRequest = PullRequestEvent & {
    title: string;
};

interface Link {
    href: string;
    name: string;
}

interface Repository {
    repository: { type: string };
    branch: { name: string };
}

export interface PullRequestGetResponse {
    type: string;
    title: string;
    links: {
        self: Link;
        html: Link;
        approve: Link;
        diff: Link;
        diffstat: Link;
        comments: Link;
        activity: Link;
        merge: Link;
        decline: Link;
    };
    id: number;
    source: Repository;
    destination: Repository;
}
