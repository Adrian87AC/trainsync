export class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
        this.trainer_id = data.trainer_id;
    }

    getFirstName() {
        return this.name.split(' ')[0];
    }
}

export class Exercise {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.muscle_group = data.muscle_group;
        this.video_url = data.video_url;
    }
}

export class ExerciseDetail {
    constructor(data) {
        this.id = data.id;
        this.exerciseId = data.exerciseId;
        this.name = data.name;
        this.muscleGroup = data.muscleGroup;
        this.videoUrl = data.videoUrl;
        this.sets = data.sets;
        this.reps = data.reps;
        this.weight = data.weight;
        this.notes = data.notes || '';
        this.completed = data.completed || false;
    }
}

export class Day {
    constructor(data) {
        this.day_name = data.day_name || data.dayName;
        this.exercises = (data.exercises || []).map(ex => new ExerciseDetail(ex));
    }
}

export class Routine {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.client_id = data.client_id;
        this.trainer_id = data.trainer_id;
        this.days = (data.days || []).map(day => new Day(day));
    }

    getTotalExercises() {
        return this.days.reduce((sum, day) => sum + day.exercises.length, 0);
    }
}
