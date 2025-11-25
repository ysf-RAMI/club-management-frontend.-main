// Small helpers to work with pivot objects returned by API
export function normalizeStatus(status) {
    if (status === undefined || status === null) return null;
    return String(status).toLowerCase();
}

export function findUserPivotInList(list, userId) {
    if (!Array.isArray(list)) return null;
    return list.find((u) => u && (u.id === userId || u.user_id === userId));
}

export function getUserClubPivot(club, userId) {
    if (!club) return null;
    // API may return a top-level `pivot` (club.user pivot) when querying user-specific endpoints
    if (club.pivot) return club.pivot;
    // Older shape: club.users is an array of user objects each possibly containing `pivot` or status
    if (Array.isArray(club.users)) return findUserPivotInList(club.users, userId);
    return null;
}

export function getUserEventPivot(event, userId) {
    if (!event) return null;
    if (event.pivot) return event.pivot;
    if (Array.isArray(event.users)) return findUserPivotInList(event.users, userId);
    return null;
}

export function isPendingPivot(pivot) {
    const s = pivot?.pivot?.status ?? pivot?.status ?? null;
    return normalizeStatus(s) === 'pending';
}

export function isApprovedPivot(pivot) {
    const s = pivot?.pivot?.status ?? pivot?.status ?? null;
    return normalizeStatus(s) === 'approved';
}

export function pivotCreatedAt(pivot) {
    // pivot may be nested under pivot.created_at or created_at on the user object
    return pivot?.pivot?.created_at || pivot?.created_at || null;
}

export default {
    normalizeStatus,
    findUserPivotInList,
    getUserClubPivot,
    getUserEventPivot,
    isPendingPivot,
    isApprovedPivot,
    pivotCreatedAt,
};
