import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Workout, MuscleGroup } from './src/types/Workout';
import WorkoutCard from './src/components/WorkoutCard';
import FormField from './src/components/FormField';

const muscleGroups: MuscleGroup[] = [
  'Peito', 'Costas', 'Pernas', 'Ombros', 'Bíceps', 'Tríceps', 'Abdômen', 'Outro',
];

export default function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>('Peito');
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setSets('');
    setReps('');
    setMuscleGroup('Peito');
    setEditingId(null);
  };

  const saveWorkout = () => {
    const trimmedName = name.trim();
    const parsedSets = Number(sets);
    const parsedReps = Number(reps);

    if (!trimmedName || !sets.trim() || !reps.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha o nome, as séries e as repetições.');
      return;
    }
    if (!Number.isInteger(parsedSets) || parsedSets < 1 || parsedSets > 99) {
      Alert.alert('Séries inválidas', 'Informe um número inteiro de séries entre 1 e 99.');
      return;
    }
    if (!Number.isInteger(parsedReps) || parsedReps < 1 || parsedReps > 999) {
      Alert.alert('Repetições inválidas', 'Informe um número inteiro de repetições entre 1 e 999.');
      return;
    }

    if (editingId) {
      setWorkouts(current =>
        current.map(item =>
          item.id === editingId
            ? { ...item, name: trimmedName, sets: parsedSets, reps: parsedReps, muscleGroup }
            : item
        )
      );
      Alert.alert('Treino atualizado', 'As informações foram atualizadas.');
    } else {
      const newWorkout: Workout = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: trimmedName,
        sets: parsedSets,
        reps: parsedReps,
        muscleGroup,
        completed: false,
      };
      setWorkouts(current => [newWorkout, ...current]);
    }
    resetForm();
  };

  const startEditing = (workout: Workout) => {
    setName(workout.name);
    setSets(String(workout.sets));
    setReps(String(workout.reps));
    setMuscleGroup(workout.muscleGroup);
    setEditingId(workout.id);
  };

  const toggleCompleted = (id: string) => {
    setWorkouts(current =>
      current.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  const deleteWorkout = (id: string) => {
    Alert.alert('Excluir exercício', 'Tem certeza de que deseja excluir este exercício?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setWorkouts(current => current.filter(item => item.id !== id));
          if (editingId === id) resetForm();
        },
      },
    ]);
  };

  const completedCount = workouts.filter(item => item.completed).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#101827" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>MEU DESEMPENHO</Text>
            <Text style={styles.title}>Registro de Treinos</Text>
            <Text style={styles.subtitle}>Organize seus exercícios e acompanhe sua evolução.</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{workouts.length}</Text>
              <Text style={styles.statLabel}>Exercícios</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{completedCount}</Text>
              <Text style={styles.statLabel}>Concluídos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{workouts.length - completedCount}</Text>
              <Text style={styles.statLabel}>Pendentes</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>{editingId ? 'Editar exercício' : 'Adicionar exercício'}</Text>
            <FormField
              label="Nome do exercício"
              placeholder="Ex.: Supino reto"
              value={name}
              onChangeText={setName}
              autoCapitalize="sentences"
            />
            <View style={styles.numberRow}>
              <View style={styles.numberField}>
                <FormField
                  label="Séries"
                  placeholder="Ex.: 4"
                  value={sets}
                  onChangeText={setSets}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.numberField}>
                <FormField
                  label="Repetições"
                  placeholder="Ex.: 12"
                  value={reps}
                  onChangeText={setReps}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <Text style={styles.fieldLabel}>Grupo muscular</Text>
            <View style={styles.groupWrap}>
              {muscleGroups.map(group => (
                <TouchableOpacity
                  key={group}
                  style={[styles.groupChip, muscleGroup === group && styles.groupChipSelected]}
                  onPress={() => setMuscleGroup(group)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: muscleGroup === group }}
                >
                  <Text style={[styles.groupChipText, muscleGroup === group && styles.groupChipTextSelected]}>
                    {group}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={saveWorkout} activeOpacity={0.85}>
              <Text style={styles.primaryButtonText}>{editingId ? 'Salvar alterações' : '+ Adicionar exercício'}</Text>
            </TouchableOpacity>
            {editingId && (
              <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                <Text style={styles.cancelButtonText}>Cancelar edição</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Seus exercícios</Text>
            <Text style={styles.listCount}>{workouts.length} registro(s)</Text>
          </View>

          {workouts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🏋️</Text>
              <Text style={styles.emptyTitle}>Nenhum exercício cadastrado</Text>
              <Text style={styles.emptyText}>Use o formulário acima para adicionar seu primeiro exercício.</Text>
            </View>
          ) : (
            <FlatList
              data={workouts}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <WorkoutCard
                  workout={item}
                  onToggleCompleted={toggleCompleted}
                  onEdit={startEditing}
                  onDelete={deleteWorkout}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
          )}

          <Text style={styles.footer}>Registro de Treinos • Dados mantidos apenas enquanto o app estiver aberto</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#101827' },
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#101827' },
  content: { padding: 20, paddingBottom: 36 },
  header: { marginTop: 14, marginBottom: 22 },
  eyebrow: { color: '#35D39A', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 8 },
  title: { color: '#F7FAFC', fontSize: 29, fontWeight: '800', letterSpacing: -0.7 },
  subtitle: { color: '#9AA8BA', fontSize: 14, lineHeight: 21, marginTop: 8 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  statCard: { flex: 1, backgroundColor: '#1A2638', borderColor: '#29384D', borderWidth: 1, borderRadius: 15, padding: 14 },
  statNumber: { color: '#35D39A', fontSize: 24, fontWeight: '800' },
  statLabel: { color: '#AAB7C8', fontSize: 11, marginTop: 5 },
  formCard: { backgroundColor: '#1A2638', borderRadius: 20, borderWidth: 1, borderColor: '#29384D', padding: 17, marginBottom: 27 },
  sectionTitle: { color: '#F7FAFC', fontSize: 18, fontWeight: '800' },
  numberRow: { flexDirection: 'row', gap: 12 },
  numberField: { flex: 1 },
  fieldLabel: { color: '#DCE5EF', fontSize: 13, fontWeight: '700', marginBottom: 9, marginTop: 4 },
  groupWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 },
  groupChip: { borderRadius: 20, borderWidth: 1, borderColor: '#3B4B61', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#142033' },
  groupChipSelected: { backgroundColor: '#35D39A', borderColor: '#35D39A' },
  groupChipText: { color: '#C1CCDA', fontSize: 12, fontWeight: '600' },
  groupChipTextSelected: { color: '#10251F', fontWeight: '800' },
  primaryButton: { backgroundColor: '#35D39A', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  primaryButtonText: { color: '#10251F', fontWeight: '800', fontSize: 14 },
  cancelButton: { paddingVertical: 12, alignItems: 'center', marginTop: 3 },
  cancelButtonText: { color: '#AAB7C8', fontWeight: '700' },
  listHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  listCount: { color: '#8F9EB2', fontSize: 12 },
  emptyState: { backgroundColor: '#1A2638', borderColor: '#29384D', borderWidth: 1, borderRadius: 18, alignItems: 'center', padding: 24 },
  emptyIcon: { fontSize: 34, marginBottom: 10 },
  emptyTitle: { color: '#F7FAFC', fontSize: 15, fontWeight: '800', textAlign: 'center' },
  emptyText: { color: '#9AA8BA', fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 7 },
  footer: { color: '#65758B', fontSize: 11, textAlign: 'center', lineHeight: 17, marginTop: 25 },
});
