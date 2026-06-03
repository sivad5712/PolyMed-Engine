package com.example.polymed.patientservice.config;

import com.example.polymed.patientservice.entity.*;
import com.example.polymed.patientservice.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataBootstrapConfig {

    @Bean
    public CommandLineRunner bootstrapData(
            PatientRepository patientRepository,
            MemberProfileRepository memberProfileRepository,
            ProviderRepository providerRepository,
            CareGapRepository careGapRepository,
            ClinicalSummaryRepository clinicalSummaryRepository,
            CareTeamRepository careTeamRepository) {
        
        return args -> {
            System.out.println(">>> Seeding PolyMed H2 database with demo healthcare records...");

            // 1. Providers
            Provider prov1 = new Provider();
            prov1.setProviderId("prov-11029");
            prov1.setNpi("1992837465");
            prov1.setFirstName("Sarah");
            prov1.setLastName("Jenkins");
            prov1.setSpecialty("Cardiology");
            prov1.setEmail("sarah.jenkins@polymed.org");
            prov1.setPhone("555-0322");
            prov1.setFacility("Boston Medical Center");
            prov1.setStatus("ACTIVE");
            providerRepository.save(prov1);

            Provider prov2 = new Provider();
            prov2.setProviderId("prov-33410");
            prov2.setNpi("1092837400");
            prov2.setFirstName("David");
            prov2.setLastName("Miller");
            prov2.setSpecialty("Family Medicine");
            prov2.setEmail("david.miller@polymed.org");
            prov2.setPhone("555-0455");
            prov2.setFacility("Cambridge Health");
            prov2.setStatus("ACTIVE");
            providerRepository.save(prov2);

            // 2. Patient
            Patient patient = new Patient();
            patient.setPatientId("pat-88291");
            patient.setFirstName("John");
            patient.setLastName("Doe");
            patient.setDateOfBirth("1980-05-15");
            patient.setGender("Male");
            patient.setEmail("john.doe@example.com");
            patient.setPhone("555-0199");
            patient.setAddress("123 Main St, Boston, MA 02110");
            patient.setSsnLastFour("1234");
            patient.setStatus("ACTIVE");
            patientRepository.save(patient);

            // 3. Member Profile
            MemberProfile member = new MemberProfile();
            member.setMemberId("mem-44910");
            member.setPatientId("pat-88291");
            member.setInsuranceProvider("PolyShield Health");
            member.setPolicyNumber("POL-9910293");
            member.setGroupNumber("GRP-8812");
            member.setCoverageEffectiveDate("2024-01-01");
            member.setCoverageStatus("ACTIVE");
            member.setPlanType("PPO");
            memberProfileRepository.save(member);

            // 4. Clinical Summary
            ClinicalSummary summary = new ClinicalSummary();
            summary.setPatientId("pat-88291");
            summary.setBloodType("A-Positive");
            summary.setAllergiesJson("[{\"allergen\":\"Penicillin\",\"severity\":\"HIGH\",\"reaction\":\"Anaphylaxis\"}]");
            summary.setChronicConditionsJson("[{\"code\":\"ICD10-I10\",\"name\":\"Essential Hypertension\",\"diagnosedDate\":\"2021-03-12\"},{\"code\":\"ICD10-E11\",\"name\":\"Type 2 Diabetes Mellitus\",\"diagnosedDate\":\"2023-08-22\"}]");
            summary.setActiveMedicationsJson("[{\"name\":\"Lisinopril 10mg\",\"dosage\":\"Once daily\",\"prescribedDate\":\"2021-03-12\"},{\"name\":\"Metformin 500mg\",\"dosage\":\"Twice daily with meals\",\"prescribedDate\":\"2023-08-22\"}]");
            summary.setBloodPressure("135/85");
            summary.setHeartRate(72);
            summary.setTemperature(98.6);
            summary.setBmi(27.4);
            clinicalSummaryRepository.save(summary);

            // 5. Care Gaps
            CareGap gap1 = new CareGap();
            gap1.setGapId("gap-1002");
            gap1.setPatientId("pat-88291");
            gap1.setMeasureCode("A1C-TEST");
            gap1.setMeasureName("Annual HbA1c Diabetes Testing");
            gap1.setStatus("OPEN");
            gap1.setDueDate("2026-12-31");
            gap1.setAssignedProviderId("prov-11029");
            gap1.setClosureReason(null);
            gap1.setEvidenceReference(null);
            careGapRepository.save(gap1);

            CareGap gap2 = new CareGap();
            gap2.setGapId("gap-1001");
            gap2.setPatientId("pat-88291");
            gap2.setMeasureCode("COLON-SCREEN");
            gap2.setMeasureName("Colorectal Cancer Screening");
            gap2.setStatus("CLOSED");
            gap2.setDueDate("2026-06-30");
            gap2.setAssignedProviderId("prov-11029");
            gap2.setClosedDate("2026-05-14");
            gap2.setClosureReason("Colonoscopy performed and documented.");
            gap2.setEvidenceReference("procedure-ref-99201");
            careGapRepository.save(gap2);

            // 6. Care Team
            CareTeam careTeam = new CareTeam();
            careTeam.setPatientId("pat-88291");
            careTeam.setProviderIds(List.of("prov-11029", "prov-33410"));
            careTeam.setAssignedRole("PRIMARY_CARE");
            careTeam.setStartDate("2026-06-02");
            careTeamRepository.save(careTeam);

            System.out.println(">>> Demo data seeded successfully.");
        };
    }
}
