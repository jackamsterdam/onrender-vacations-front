import VacationModel from "../Models/VacationModel";

export class VacationsState {
    vacations: VacationModel[] = []
}

export enum VacationsActionType {
    FetchVacations = 'FetchVacations',
    AddVacation = 'AddVacation',
    UpdateVacation = 'UpdateVacation',
    DeleteVacation = 'DeleteVacation'
}

export interface VacationsAction {
    type: VacationsActionType
    payload: any
}

export function fetchVacationsAction(vacations: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.FetchVacations, payload: vacations }
}

export function addVacationAction(vacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.AddVacation, payload: vacation }
}

export function updateVacationAction(vacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.UpdateVacation, payload: vacation }
}

export function deleteVacationAction(vacationId: number): VacationsAction {
    return { type: VacationsActionType.DeleteVacation, payload: vacationId }
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = { ...currentState }

    switch (action.type) {
        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload
            break;

        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload)
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId)
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload
            }
            break;

        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload)
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1)
            }
            break;
    }

    return newState
}