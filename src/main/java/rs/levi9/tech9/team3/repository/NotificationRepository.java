package rs.levi9.tech9.team3.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.levi9.tech9.team3.domain.*;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	
public Notification findByComment(Comment comment);
public Notification findByRate(Rate rate);
public List<Notification> findByUserOrderByCreationDateDesc(User user);
public Notification findByReport(Report report);



// vraca sve rate notifikacije i sve comment notifikacije za odredjenog usera
public List<Notification> findByReportIsNullAndUserAndStatusIsTrue(User user);

//vraca sve report notifikacije koje imaju status true, koje nisu pregledane
public List<Notification> findByRateIsNullAndCommentIsNullAndStatusIsTrue();

public List<Notification> findByReportIsNotNull();


}
