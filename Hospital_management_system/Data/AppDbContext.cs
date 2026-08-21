using HMS_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace HMS_Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Plural names (EF convention)
        public DbSet<User> Users => Set<User>();
        public DbSet<Doctor> Doctors => Set<Doctor>();
        public DbSet<Patient> Patients => Set<Patient>();
        public DbSet<Appointment> Appointments => Set<Appointment>();
        public DbSet<Department> Departments => Set<Department>();
        public DbSet<DoctorDepartment> DoctorDepartments => Set<DoctorDepartment>();
        public DbSet<Status> Statuses => Set<Status>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ── User → Doctor (1-to-1, optional) ─────────────────────────────────
        // The FK (UserID) lives on the Doctor table.
        modelBuilder.Entity<User>()
            .HasOne(u => u.Doctor)
            .WithOne(d => d.User)
            .HasForeignKey<Doctor>(d => d.UserID)
            .OnDelete(DeleteBehavior.Restrict);   // avoid cascade conflicts

        // Enforce uniqueness: a UserID can appear in Doctors at most once
        modelBuilder.Entity<Doctor>()
            .HasIndex(d => d.UserID)
            .IsUnique();

        // ── User → Patient (1-to-1, optional) ────────────────────────────────
        // The FK (UserID) lives on the Patient table.
        modelBuilder.Entity<User>()
            .HasOne(u => u.Patient)
            .WithOne(p => p.User)
            .HasForeignKey<Patient>(p => p.UserID)
            .OnDelete(DeleteBehavior.Restrict);   // avoid cascade conflicts

        // Enforce uniqueness: a UserID can appear in Patients at most once
        modelBuilder.Entity<Patient>()
            .HasIndex(p => p.UserID)
            .IsUnique();

        // ── Appointment relationships ─────────────────────────────────────────
        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.User)
            .WithMany(u => u.Appointments)
            .HasForeignKey(a => a.UserID)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Doctor)
            .WithMany(d => d.Appointments)
            .HasForeignKey(a => a.DoctorID)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Patient)
            .WithMany(p => p.Appointments)
            .HasForeignKey(a => a.PatientID)
            .OnDelete(DeleteBehavior.Restrict);

        // ── Decimal precision ─────────────────────────────────────────────────
        modelBuilder.Entity<Appointment>()
            .Property(a => a.TotalConsultedAmount)
            .HasPrecision(18, 2);

        // ── Global: restrict any remaining FK relationships to avoid multiple
        //    cascade paths that SQL Server cannot resolve automatically.
        foreach (var relationship in modelBuilder.Model.GetEntityTypes()
            .SelectMany(e => e.GetForeignKeys()))
        {
            if (relationship.DeleteBehavior == DeleteBehavior.Cascade)
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
    }
}