import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Workout } from '../types/Workout';

type WorkoutCardProps = {
  workout: Workout;
  onToggleCompleted: (id: string) => void;
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
};

export default function WorkoutCard({
  workout,
  onToggleCompleted,
  onEdit,
  onDelete,
}: WorkoutCardProps) {
  return (
    <View style={[styles.card, workout.completed && styles.cardCompleted]}>
      <View style={styles.topRow}>
        <View style={styles.titleArea}>
          <Text style={[styles.name, workout.completed && styles.completedName]}>{workout.name}</Text>
          <Text style={styles.group}>{workout.muscleGroup}</Text>
        </View>
        <TouchableOpacity
          style={[styles.statusButton, workout.completed && styles.statusButtonCompleted]}
          onPress={() => onToggleCompleted(workout.id)}
          accessibilityRole="button"
          accessibilityLabel={workout.completed ? 'Marcar como pendente' : 'Marcar como concluído'}
        >
          <Text style={[styles.statusText, workout.completed && styles.statusTextCompleted]}>
            {workout.completed ? '✓ Feito' : '○ Pendente'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailPill}>
          <Text style={styles.detailText}>{workout.sets} séries</Text>
        </View>
        <View style={styles.detailPill}>
          <Text style={styles.detailText}>{workout.reps} repetições</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(workout)}>
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(workout.id)}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1A2638', borderColor: '#29384D', borderWidth: 1, borderRadius: 17, padding: 16 },
  cardCompleted: { borderColor: '#267C63', backgroundColor: '#172D31' },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
  titleArea: { flex: 1 },
  name: { color: '#F7FAFC', fontSize: 16, fontWeight: '800' },
  completedName: { color: '#9DB5AC', textDecorationLine: 'line-through' },
  group: { color: '#35D39A', fontSize: 12, fontWeight: '700', marginTop: 5 },
  statusButton: { borderRadius: 18, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: '#2C3B50' },
  statusButtonCompleted: { backgroundColor: '#35D39A' },
  statusText: { color: '#D6E0ED', fontSize: 11, fontWeight: '800' },
  statusTextCompleted: { color: '#10251F' },
  detailsRow: { flexDirection: 'row', gap: 8, marginTop: 15 },
  detailPill: { backgroundColor: '#142033', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7 },
  detailText: { color: '#B9C6D7', fontSize: 12, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 9, marginTop: 15, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#2B3A4F' },
  editButton: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 9, backgroundColor: '#263950' },
  editText: { color: '#D6E7FA', fontWeight: '700', fontSize: 12 },
  deleteButton: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 9, backgroundColor: '#402B37' },
  deleteText: { color: '#FFB6C1', fontWeight: '700', fontSize: 12 },
});
