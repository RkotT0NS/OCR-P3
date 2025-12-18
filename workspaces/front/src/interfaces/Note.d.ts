
export interface Note {
    id: string;
    text: string;
    tag_id: string;
}
export interface NoteCreationDTO {
    text: string;
    tag_id: string;
}

export interface NoteDeletionDTO {
    reference: string;
}
