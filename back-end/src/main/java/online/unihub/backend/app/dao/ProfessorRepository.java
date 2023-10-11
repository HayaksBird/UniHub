package online.unihub.backend.app.dao;

import online.unihub.backend.app.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Integer> {
}
