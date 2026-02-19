export class Usuario {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
        this.trainer_id = data.trainer_id;
    }

    obtenerNombre() {
        return this.name.split(' ')[0];
    }
}

export class Ejercicio {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.muscle_group = data.muscle_group;
    }
}

export class DetalleEjercicio {
    constructor(data) {
        this.id = data.id;
        this.exerciseId = data.exerciseId;
        this.sets = data.sets;
        this.reps = data.reps;
        this.weight = data.weight;
        this.notes = data.notes || '';
        this.completed = data.completed || false;
    }
}

export class Dia {
    constructor(data) {
        this.day_name = data.day_name;
        this.exercises = (data.exercises || []).map(ej => new DetalleEjercicio(ej));
    }
}

export class Rutina {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.client_id = data.client_id;
        this.trainer_id = data.trainer_id;
        this.days = (data.days || []).map(dia => new Dia(dia));
    }

    obtenerTotalEjercicios() {
        return this.days.reduce((suma, dia) => suma + dia.exercises.length, 0);
    }
}
